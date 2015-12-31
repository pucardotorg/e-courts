/* eGov suite of products aim to improve the internal efficiency,transparency,
   accountability and the service delivery of the government  organizations.

    Copyright (C) <2015>  eGovernments Foundation

    The updated version of eGov suite of products as by eGovernments Foundation
    is available at http://www.egovernments.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses/ or
    http://www.gnu.org/licenses/gpl.html .

    In addition to the terms of the GPL license to be adhered to in using this
    program, the following additional terms are to be complied with:

        1) All versions of this program, verbatim or modified must carry this
           Legal Notice.

        2) Any misrepresentation of the origin of the material is prohibited. It
           is required that all modified versions of this material be marked in
           reasonable ways as different from the original version.

        3) This license does not grant any rights to any user of the program
           with regards to rights under trademark law for use of the trade names
           or trademarks of eGovernments Foundation.

  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.adtax.web.controller.common;

import java.text.SimpleDateFormat;
import java.util.List;

import org.egov.adtax.entity.Advertisement;
import org.egov.adtax.entity.HoardingCategory;
import org.egov.adtax.entity.HoardingDocument;
import org.egov.adtax.entity.HoardingDocumentType;
import org.egov.adtax.entity.RatesClass;
import org.egov.adtax.entity.RevenueInspector;
import org.egov.adtax.entity.UnitOfMeasure;
import org.egov.adtax.service.AdvertisementDemandService;
import org.egov.adtax.service.AdvertisementRateService;
import org.egov.adtax.service.HoardingCategoryService;
import org.egov.adtax.service.HoardingDocumentTypeService;
import org.egov.adtax.service.AdvertisementService;
import org.egov.adtax.service.RatesClassService;
import org.egov.adtax.service.RevenueInspectorService;
import org.egov.adtax.service.SubCategoryService;
import org.egov.adtax.service.UnitOfMeasureService;
import org.egov.adtax.utils.constants.AdvertisementTaxConstants;
import org.egov.infra.admin.master.entity.Boundary;
import org.egov.infra.admin.master.service.BoundaryService;
import org.egov.infra.config.properties.ApplicationProperties;
import org.egov.infra.utils.FileStoreUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

public class HoardingControllerSupport {
     protected SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
    protected @Autowired AdvertisementService hoardingService;
    protected @Autowired SubCategoryService subCategoryService;
    protected @Autowired FileStoreUtils fileStoreUtils;
    protected @Autowired BoundaryService boundaryService;
    protected @Autowired AdvertisementRateService advertisementRateService;
    protected @Autowired HoardingCategoryService hoardingCategoryService;
    protected @Autowired UnitOfMeasureService unitOfMeasureService;
    protected @Autowired RevenueInspectorService revenueInspectorService;
    protected @Autowired RatesClassService ratesClassService;
    protected @Autowired HoardingDocumentTypeService hoardingDocumentTypeService;
    protected @Autowired ApplicationProperties applicationProperties;
    protected @Autowired AdvertisementDemandService advertisementDemandService;

    @ModelAttribute("hoardingCategories")
    public List<HoardingCategory> hoardingCategories() {
        return hoardingCategoryService.getAllActiveHoardingCategory();
    }

    @ModelAttribute("uom")
    public List<UnitOfMeasure> uom() {
        return unitOfMeasureService.getAllActiveUnitOfMeasure();
    }

    @ModelAttribute("revenueInspectors")
    public List<RevenueInspector> revenueInspectors() {
        return revenueInspectorService.findAllActiveRevenueInspectors();
    }

    @ModelAttribute("rateClasses")
    public List<RatesClass> rateClasses() {
        return ratesClassService.getAllActiveRatesClass();
    }

    @ModelAttribute("allRateClasses")
    public List<RatesClass> getAllRatesClass() {
        return ratesClassService.getAllRatesClass();
    }
       
    @ModelAttribute("hoardingDocumentTypes")
    public List<HoardingDocumentType> hoardingDocumentTypes() {
        return hoardingDocumentTypeService.getAllDocumentTypes();
    }

    @ModelAttribute("revenueZones")
    public List<Boundary> revenueZones() {
        return boundaryService.getActiveBoundariesByBndryTypeNameAndHierarchyTypeName(AdvertisementTaxConstants.BOUNDARYTYPE_ZONE,AdvertisementTaxConstants.ELECTION_HIERARCHY_TYPE);
    }

    @ModelAttribute("zones")
    public List<Boundary> zones() {
        return boundaryService.getActiveBoundariesByBndryTypeNameAndHierarchyTypeName(AdvertisementTaxConstants.BOUNDARYTYPE_ZONE, AdvertisementTaxConstants.ADMINISTRATION_HIERARCHY_TYPE );
    }
    @ModelAttribute("localities")
    public List<Boundary> localities() {
        return boundaryService.getActiveBoundariesByBndryTypeNameAndHierarchyTypeName(AdvertisementTaxConstants.BOUNDARYTYPE_LOCALITY, AdvertisementTaxConstants.LOCATION_HIERARCHY_TYPE );
    }
    @ModelAttribute("revenueWards")
    public List<Boundary> revenueWards() {
        return boundaryService.getActiveBoundariesByBndryTypeNameAndHierarchyTypeName(AdvertisementTaxConstants.BOUNDARYTYPE_ELECTIONWARD, AdvertisementTaxConstants.ELECTION_HIERARCHY_TYPE );
    }
    
    protected void storeHoardingDocuments(final Advertisement hoarding) {
        hoarding.getDocuments().forEach(document -> {
            document.setFiles(fileStoreUtils.addToFileStore(document.getAttachments(), "ADTAX"));
        });
    }
    protected void updateHoardingDocuments(final Advertisement hoarding) {
        hoarding.getDocuments().forEach(document -> {
            document.addFiles(fileStoreUtils.addToFileStore(document.getAttachments(), "ADTAX"));
        });
    }
    
    protected void validateHoardingDocs(final Advertisement hoarding, final BindingResult resultBinder) {
        int index = 0;
        for (final HoardingDocument document : hoarding.getDocuments()) {
            if (document.getDoctype().isMandatory() && document.getAttachments()[0].getSize() == 0)
                resultBinder.rejectValue("documents[" + index + "].attachments", "hoarding.doc.mandatory");
            else if (document.isEnclosed() && document.getAttachments()[0].getSize() == 0)
                resultBinder.rejectValue("documents[" + index + "].attachments", "hoarding.doc.not.enclosed");
            index++;
        }
    }
    protected void validateHoardingDocsOnUpdate(final Advertisement hoarding, final BindingResult resultBinder, RedirectAttributes redirAttrib) {
        int index = 0;
        for (final HoardingDocument document : hoarding.getDocuments()) {
            if (document.getDoctype().isMandatory() && document.getFiles().size()==0 && document.getAttachments()[0].getSize() == 0){
                resultBinder.rejectValue("documents[" + index + "].attachments", "hoarding.doc.mandatory");
                redirAttrib.addFlashAttribute("message", "hoarding.doc.not.enclosed");
            }
            else if (document.isEnclosed() && document.getFiles().size()==0 && document.getAttachments()[0].getSize() == 0)
            {
                resultBinder.rejectValue("documents[" + index + "].attachments", "hoarding.doc.not.enclosed");
                redirAttrib.addFlashAttribute("message", "hoarding.doc.not.enclosed");
            }
                index++;
        }
       
        
    }
}

package org.pucar.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.egov.common.contract.response.ResponseInfo;
import org.pucar.service.AdvocateService;
import org.pucar.util.ResponseInfoFactory;
import org.pucar.web.models.Advocate;
import org.pucar.web.models.AdvocateRequest;
import org.pucar.web.models.AdvocateResponse;
import org.pucar.web.models.AdvocateSearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@jakarta.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2024-04-04T05:55:27.937918+05:30[Asia/Kolkata]")
@Controller
@RequestMapping("")
public class AdvocateApiController {

	private final ObjectMapper objectMapper;

	private final HttpServletRequest request;

	@Autowired
	private AdvocateService advocateService;

	@Autowired
	private ResponseInfoFactory responseInfoFactory;


	@Autowired
	public AdvocateApiController(ObjectMapper objectMapper, HttpServletRequest request) {
		this.objectMapper = objectMapper;
		this.request = request;
	}


	@RequestMapping(value = "/advocate/v1/_create", method = RequestMethod.POST)
	public ResponseEntity<AdvocateResponse> advocateV1CreatePost(
			@Parameter(in = ParameterIn.DEFAULT, description = "Details for the user registration + RequestInfo meta data.", required = true, schema = @Schema()) @Valid @RequestBody AdvocateRequest body) {
			try {
				List<Advocate> response = advocateService.createAdvocate(body);
				ResponseInfo responseInfo = responseInfoFactory.createResponseInfoFromRequestInfo(body.getRequestInfo(), true);
				AdvocateResponse advocateResponse = AdvocateResponse.builder().advocates(response).responseInfo(responseInfo).build();
				return new ResponseEntity<>(advocateResponse, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}

	@RequestMapping(value = "/advocate/v1/_search", method = RequestMethod.POST)
	public ResponseEntity<AdvocateResponse> advocateV1SearchPost(
			@Parameter(in = ParameterIn.DEFAULT, description = "Search criteria + RequestInfo meta data.", required = true, schema = @Schema()) @Valid @RequestBody AdvocateSearchRequest body) {

            try {
				List<Advocate> advocateList = advocateService.searchAdvocate(body.getRequestInfo(), body.getCriteria(), body.getStatus() );
				ResponseInfo responseInfo = responseInfoFactory.createResponseInfoFromRequestInfo(body.getRequestInfo(), true);
				AdvocateResponse advocateResponse = AdvocateResponse.builder().advocates(advocateList).responseInfo(responseInfo).build();
				return new ResponseEntity<>(advocateResponse, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}

	@RequestMapping(value = "/advocate/v1/_update", method = RequestMethod.POST)
	public ResponseEntity<AdvocateResponse> advocateV1UpdatePost(
			@Parameter(in = ParameterIn.DEFAULT, description = "Details of the registered advocate + RequestInfo meta data.", required = true, schema = @Schema()) @Valid @RequestBody AdvocateRequest body) {

			try {
				// Example after implementing a service layer
				List<Advocate> advocateList = advocateService.updateAdvocate(body);
				ResponseInfo responseInfo = responseInfoFactory.createResponseInfoFromRequestInfo(body.getRequestInfo(), true);
				AdvocateResponse advocateResponse = AdvocateResponse.builder().advocates(advocateList).responseInfo(responseInfo).build();
				return new ResponseEntity<>(advocateResponse, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<AdvocateResponse>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

}

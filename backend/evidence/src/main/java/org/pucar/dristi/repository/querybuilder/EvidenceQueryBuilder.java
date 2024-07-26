package org.pucar.dristi.repository.querybuilder;
import lombok.extern.slf4j.Slf4j;
import org.egov.tracer.model.CustomException;
import org.pucar.dristi.web.models.Pagination;
import org.springframework.stereotype.Component;

import java.sql.Types;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.pucar.dristi.config.ServiceConstants.*;

@Component
@Slf4j
public class EvidenceQueryBuilder {

    private static final String BASE_ARTIFACT_QUERY = " SELECT art.id as id, art.tenantId as tenantId, art.artifactNumber as artifactNumber, " +
            "art.evidenceNumber as evidenceNumber, art.externalRefNumber as externalRefNumber, art.caseId as caseId, " +
            "art.application as application, art.filingNumber as filingNumber, art.hearing as hearing, art.orders as orders, art.mediaType as mediaType, " +
            "art.artifactType as artifactType, art.sourceType as sourceType, art.sourceID as sourceID, art.sourceName as sourceName, art.applicableTo as applicableTo, " +
            "art.createdDate as createdDate, art.isActive as isActive, art.isEvidence as isEvidence, art.status as status, art.description as description, " +
            "art.artifactDetails as artifactDetails, art.additionalDetails as additionalDetails, art.createdBy as createdBy, " +
            "art.lastModifiedBy as lastModifiedBy, art.createdTime as createdTime, art.lastModifiedTime as lastModifiedTime ";

    private static final String DOCUMENT_SELECT_QUERY = "SELECT doc.id as id, doc.fileStore as fileStore, doc.documentUid as documentUid, " +
            "doc.documentType as documentType, doc.artifactId as artifactId, doc.additionalDetails as additionalDetails ";

    private static final String COMMENT_SELECT_QUERY = "SELECT com.id as id, com.tenantId as tenantId, com.artifactId as artifactId, " +
            "com.individualId as individualId, com.comment as comment, com.isActive as isActive, com.additionalDetails as additionalDetails, " +
            "com.createdBy as createdBy, com.lastModifiedBy as lastModifiedBy, com.createdTime as createdTime, com.lastModifiedTime as lastModifiedTime ";
    private  static  final String TOTAL_COUNT_QUERY = "SELECT COUNT(*) FROM ({baseQuery}) total_result";
    private static final String DEFAULT_ORDERBY_CLAUSE = " ORDER BY art.createdtime DESC ";
    private static final String ORDERBY_CLAUSE = " ORDER BY art.{orderBy} {sortingOrder} ";
    private static final String FROM_ARTIFACTS_TABLE = " FROM dristi_evidence_artifact art";
    private static final String FROM_DOCUMENTS_TABLE = " FROM dristi_evidence_document doc";
    private static final String FROM_COMMENTS_TABLE = " FROM dristi_evidence_comment com";

    public String getArtifactSearchQuery(List<Object> preparedStmtList, List<Integer> preparedStmtArgList,UUID owner, String artifactType , Boolean evidenceStatus , String id, String caseId, String application, String filingNumber, String hearing, String order, String sourceId, String sourceName, String artifactNumber) {
        try {
            StringBuilder query = new StringBuilder(BASE_ARTIFACT_QUERY);
            query.append(FROM_ARTIFACTS_TABLE);
            boolean firstCriteria = true; // To check if it's the first criteria

            firstCriteria =addArtifactCriteria(id, query, preparedStmtList, firstCriteria, "art.id = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(caseId, query, preparedStmtList, firstCriteria, "art.caseId = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(application, query, preparedStmtList, firstCriteria, "art.application = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(artifactType, query, preparedStmtList, firstCriteria, "art.artifactType = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(evidenceStatus, query, preparedStmtList, firstCriteria, preparedStmtArgList);
            firstCriteria =addArtifactCriteria(filingNumber, query, preparedStmtList, firstCriteria, "art.filingNumber = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(hearing, query, preparedStmtList, firstCriteria, "art.hearing = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(order, query, preparedStmtList, firstCriteria, "art.orders = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(sourceId, query, preparedStmtList, firstCriteria, "art.sourceId = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(owner!=null?(owner.toString()):null, query, preparedStmtList, firstCriteria, "art.createdBy = ?",preparedStmtArgList);
            firstCriteria =addArtifactCriteria(sourceName, query, preparedStmtList, firstCriteria, "art.sourceName = ?",preparedStmtArgList);
            addArtifactPartialCriteria(artifactNumber, query, preparedStmtList, firstCriteria, preparedStmtArgList);


            return query.toString();
        } catch (Exception e) {
            log.error("Error while building artifact search query", e);
            throw new CustomException(EVIDENCE_SEARCH_QUERY_EXCEPTION, "Error occurred while building the artifact search query: " + e.toString());
        }
    }
    void addArtifactPartialCriteria(String criteria, StringBuilder query, List<Object> preparedStmtList, boolean firstCriteria, List<Integer>preparedStmtArgList ) {
        if (criteria != null && !criteria.isEmpty()) {
            addClauseIfRequired(query, firstCriteria);
            query.append("art.artifactNumber").append(" LIKE ?");
            preparedStmtList.add("%" + criteria + "%");
            preparedStmtArgList.add(Types.VARCHAR);// Add wildcard characters for partial match
        }
    }
    boolean addArtifactCriteria(String criteria, StringBuilder query, List<Object> preparedStmtList, boolean firstCriteria, String criteriaClause,List<Integer> preparedStmtArgList) {
        if (criteria != null && !criteria.isEmpty()) {
            addClauseIfRequired(query, firstCriteria);
            query.append(criteriaClause);
            preparedStmtList.add(criteria);
            preparedStmtArgList.add(Types.VARCHAR);
            firstCriteria = false;
        }
        return firstCriteria;
    }
    boolean addArtifactCriteria(Boolean criteria, StringBuilder query, List<Object> preparedStmtList, boolean firstCriteria, List<Integer> preparedStmtArgList) {
        if (criteria != null) {
            addClauseIfRequired(query, firstCriteria);
            query.append("art.isEvidence = ?");
            preparedStmtList.add(criteria);
            preparedStmtArgList.add(Types.VARCHAR);
            firstCriteria = false;
        }
        return firstCriteria;
    }

    public String getTotalCountQuery(String baseQuery) {
        return TOTAL_COUNT_QUERY.replace("{baseQuery}", baseQuery);
    }
    public String getDocumentSearchQuery(List<String> ids, List<Object> preparedStmtList, List<Integer> preparedStmtArgList) {
        try {
            StringBuilder query = new StringBuilder(DOCUMENT_SELECT_QUERY);
            query.append(FROM_DOCUMENTS_TABLE);
            if (!ids.isEmpty()) {
                query.append(" WHERE doc.artifactId IN (")
                        .append(ids.stream().map(id -> "?").collect(Collectors.joining(",")))
                        .append(")");
                preparedStmtList.addAll(ids);
                ids.forEach(i->preparedStmtArgList.add(Types.VARCHAR));
            }

            return query.toString();
        } catch (Exception e) {
            log.error("Error while building document search query");
            throw new CustomException("DOCUMENT_SEARCH_QUERY_EXCEPTION", "Error occurred while building the query: " + e.toString());
        }
    }
    public String addOrderByQuery(String query, Pagination pagination) {
        if (pagination == null || pagination.getSortBy() == null || pagination.getOrder() == null) {
            return query + DEFAULT_ORDERBY_CLAUSE;
        } else {
            query = query + ORDERBY_CLAUSE;
        }
        return query.replace("{orderBy}", pagination.getSortBy()).replace("{sortingOrder}", pagination.getOrder().name());
    }

    public String addPaginationQuery(String query, Pagination pagination, List<Object> preparedStatementList) {
        preparedStatementList.add(pagination.getLimit());
        preparedStatementList.add(pagination.getOffSet());
        return query + " LIMIT ? OFFSET ?";
    }

    public String getCommentSearchQuery(List<String> artifactIds, List<Object> preparedStmtList, List<Integer> preparedStmtArgList) {
        try {
            StringBuilder query = new StringBuilder(COMMENT_SELECT_QUERY);
            query.append(FROM_COMMENTS_TABLE);

            if (artifactIds != null && !artifactIds.isEmpty()) {
                query.append(" WHERE com.artifactId IN (");
                for (int i = 0; i < artifactIds.size(); i++) {
                    query.append("?");
                    preparedStmtList.add(artifactIds.get(i));
                    preparedStmtArgList.add(Types.VARCHAR);
                    if (i < artifactIds.size() - 1) {
                        query.append(",");
                    }
                }
                query.append(")");
            }

            return query.toString();
        } catch (Exception e) {
            log.error("Error while building comment search query", e);
            throw new CustomException(COMMENT_SEARCH_QUERY_EXCEPTION, "Error occurred while building the comment search query: " + e.toString());
        }
    }


    private void addClauseIfRequired(StringBuilder query, boolean isFirstCriteria) {
        if (isFirstCriteria) {
            query.append(" WHERE ");
        } else {
            query.append(" AND ");
        }
    }
}
package com.c4_soft.tests.baoloc.web;

import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.linkWithRel;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;

import org.springframework.restdocs.hypermedia.HypermediaDocumentation;
import org.springframework.restdocs.hypermedia.LinkDescriptor;
import org.springframework.restdocs.hypermedia.LinksSnippet;
import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.payload.PayloadSubsectionExtractor;
import org.springframework.restdocs.payload.ResponseFieldsSnippet;
import org.springframework.restdocs.snippet.Snippet;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
public class RestdocsSupport {

	public static LinksSnippet links(LinkDescriptor... descriptors) {
		return HypermediaDocumentation.links(descriptors)
				.and(linkWithRel("self").ignored().optional())
				.and(linkWithRel("page").ignored().optional());
	}

	public static ResponseFieldsSnippet ignoreLinks(ResponseFieldsSnippet snippet) {
		return snippet.and(subsectionWithPath("_links").ignored().optional());
	}

	public static ResponseFieldsSnippet ignorePage(ResponseFieldsSnippet snippet, String collectionName) {
		return snippet
				.and(subsectionWithPath("_embedded." + collectionName).ignored(), subsectionWithPath("page").ignored());
	}

	public static ResponseFieldsSnippet responseFields(FieldDescriptor... descriptors) {
		return ignoreLinks(PayloadDocumentation.responseFields(descriptors));
	}

	public static ResponseFieldsSnippet
			responseFields(PayloadSubsectionExtractor<?> subsectionExtractor, FieldDescriptor... descriptors) {
		return ignoreLinks(PayloadDocumentation.responseFields(subsectionExtractor, descriptors));
	}

	public static RestDocumentationResultHandler document(String useCase, Snippet... snippets) {
		return org.springframework.restdocs.mockmvc.MockMvcRestDocumentation
				.document(useCase, preprocessRequest(prettyPrint()), preprocessResponse(prettyPrint()), snippets);
	}

}

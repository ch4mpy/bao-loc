package com.c4_soft.bao_loc.web.dtos;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@XmlRootElement
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolutionResponse implements Serializable {
	static final long serialVersionUID = -6427729256535659720L;

	@NotNull
	private Long id;

	@NotNull
	private Long x1;

	@NotNull
	private Long x2;

	@NotNull
	private Long x3;

	@NotNull
	private Long x4;

	@NotNull
	private Long x5;

	@NotNull
	private Long x6;

	@NotNull
	private Long x7;

	@NotNull
	private Long x8;

	@NotNull
	private Long x9;
}

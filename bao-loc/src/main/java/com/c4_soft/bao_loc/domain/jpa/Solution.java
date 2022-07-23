package com.c4_soft.bao_loc.domain.jpa;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Solution {

	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "player_id", nullable = false, updatable = false)
	private Player player;

	private Long x1;

	private Long x2;

	private Long x3;

	private Long x4;

	private Long x5;

	private Long x6;

	private Long x7;

	private Long x8;

	private Long x9;

	public Solution(Long x1, Long x2, Long x3, Long x4, Long x5, Long x6, Long x7, Long x8, Long x9) {
		super();
		this.x1 = x1;
		this.x2 = x2;
		this.x3 = x3;
		this.x4 = x4;
		this.x5 = x5;
		this.x6 = x6;
		this.x7 = x7;
		this.x8 = x8;
		this.x9 = x9;
	}

	@Override
	public String toString() {
		return "{" + x1 + ", " + x2 + ", " + x3 + ", " + x4 + ", " + x5 + ", " + x6 + ", " + x7 + ", " + x8 + ", " + x9
				+ "}";
	}

}

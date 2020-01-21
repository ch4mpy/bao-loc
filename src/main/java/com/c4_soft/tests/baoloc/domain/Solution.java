package com.c4_soft.tests.baoloc.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Jérôme Wacongne &lt;ch4mp#64;c4-soft.com&gt;
 */
@Entity
public class Solution {

	@Id
	@GeneratedValue
	private Long id;

	private Long x1;

	private Long x2;

	private Long x3;

	private Long x4;

	private Long x5;

	private Long x6;

	private Long x7;

	private Long x8;

	private Long x9;

	public Solution(long x1, long x2, long x3, long x4, long x5, long x6, long x7, long x8, long x9) {
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

	Solution() {
		super();
		this.x1 = null;
		this.x2 = null;
		this.x3 = null;
		this.x4 = null;
		this.x5 = null;
		this.x6 = null;
		this.x7 = null;
		this.x8 = null;
		this.x9 = null;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getX1() {
		return x1;
	}

	public Long getX2() {
		return x2;
	}

	public Long getX3() {
		return x3;
	}

	public Long getX4() {
		return x4;
	}

	public Long getX5() {
		return x5;
	}

	public Long getX6() {
		return x6;
	}

	public Long getX7() {
		return x7;
	}

	public Long getX8() {
		return x8;
	}

	public Long getX9() {
		return x9;
	}

	public void setX1(long x1) {
		this.x1 = x1;
	}

	public void setX2(long x2) {
		this.x2 = x2;
	}

	public void setX3(long x3) {
		this.x3 = x3;
	}

	public void setX4(long x4) {
		this.x4 = x4;
	}

	public void setX5(long x5) {
		this.x5 = x5;
	}

	public void setX6(long x6) {
		this.x6 = x6;
	}

	public void setX7(long x7) {
		this.x7 = x7;
	}

	public void setX8(long x8) {
		this.x8 = x8;
	}

	public void setX9(long x9) {
		this.x9 = x9;
	}

	@Override
	public String toString() {
		return "{" + x1 + ", " + x2 + ", " + x3 + ", " + x4 + ", " + x5 + ", " + x6 + ", " + x7 + ", " + x8 + ", " + x9
				+ "}";
	}

}
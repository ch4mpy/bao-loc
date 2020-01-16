package com.c4soft.tests.skazy.domain;

import java.util.Objects;

public class Solution {

	private final long x1;

	private final long x2;

	private final long x3;

	private final long x4;

	private final long x5;

	private final long x6;

	private final long x7;

	private final long x8;

	private final long x9;

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

	@Override
	public int hashCode() {
		return Objects.hash(x1, x2, x3, x4, x5, x6, x7, x8, x9);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Solution)) {
			return false;
		}
		final Solution other = (Solution) obj;
		return Objects.equals(x1, other.x1)
				&& Objects.equals(x2, other.x2)
				&& Objects.equals(x3, other.x3)
				&& Objects.equals(x4, other.x4)
				&& Objects.equals(x5, other.x5)
				&& Objects.equals(x6, other.x6)
				&& Objects.equals(x7, other.x7)
				&& Objects.equals(x8, other.x8)
				&& Objects.equals(x9, other.x9);
	}

	@Override
	public String toString() {
		return "{" + x1 + ", " + x2 + ", " + x3 + ", " + x4 + ", " + x5 + ", " + x6 + ", " + x7 + ", " + x8 + ", " + x9
				+ "}";
	}

}
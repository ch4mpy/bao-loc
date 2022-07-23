package com.c4_soft.bao_loc.domain.jpa;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Player {
	@Id
	private String subject;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Solution> solutions;
}

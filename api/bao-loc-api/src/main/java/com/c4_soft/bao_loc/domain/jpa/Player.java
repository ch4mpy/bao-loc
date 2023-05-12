package com.c4_soft.bao_loc.domain.jpa;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

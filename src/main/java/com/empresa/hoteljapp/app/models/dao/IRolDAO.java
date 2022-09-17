package com.empresa.hoteljapp.app.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.empresa.hoteljapp.app.models.entities.Role;


public interface IRolDAO extends CrudRepository<Role,Long>{
	
	List<Role> findByNombreIgnoreCase(String cadena);

}

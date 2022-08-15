package com.empresa.hoteljapp.app.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.empresa.hoteljapp.app.models.entities.Rol;


public interface IRolDAO extends CrudRepository<Rol,Long>{
	List<Rol> findByNombreIgnoreCase(String cadena);

}

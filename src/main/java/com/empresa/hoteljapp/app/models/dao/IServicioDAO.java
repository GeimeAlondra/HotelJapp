package com.empresa.hoteljapp.app.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.empresa.hoteljapp.app.models.entities.Servicio;

public interface IServicioDAO extends CrudRepository<Servicio,Long>{
	List<Servicio> findByNombreIgnoreCase(String cadena);

}

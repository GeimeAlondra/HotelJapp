package com.empresa.hoteljapp.app.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.empresa.hoteljapp.app.models.entities.Habitacion;

public interface IHabitacionDAO extends CrudRepository<Habitacion,Long>{
	
	@Query("FROM Habitacion p WHERE p.nombre=:#{#habitacion.nombre} and p.precio=:#{#habitacion.precio}")
	List<Habitacion> findByNombrePrecio(Habitacion habitacion);
	
	@Query("FROM Habitacion p WHERE p.estado = 'D' ORDER BY p.id DESC")
	List<Habitacion> findAll();
	
	@Query("FROM Habitacion p WHERE p.estado = 'I' ORDER BY p.id DESC")
	List<Habitacion> findAllInactivos();
}


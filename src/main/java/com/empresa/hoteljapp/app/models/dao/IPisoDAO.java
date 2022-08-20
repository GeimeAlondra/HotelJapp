package com.empresa.hoteljapp.app.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.empresa.hoteljapp.app.models.entities.Piso;


public interface IPisoDAO extends CrudRepository<Piso,Long>{
	
	@Query("FROM Piso p WHERE p.nombre=:#{#piso.nombre}")
	List<Piso> findByNombreDescripcion(Piso piso);
	
	@Query("FROM Piso p WHERE p.estado= 'D' ORDER BY p.id DESC")
	List<Piso> findAll();
	
	@Query("FROM Piso p WHERE p.estado= 'I' ORDER BY p.id DESC")
	List<Piso> findAllInactivos();

}

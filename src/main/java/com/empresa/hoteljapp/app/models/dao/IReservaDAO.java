package com.empresa.hoteljapp.app.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.empresa.hoteljapp.app.models.entities.Reserva;

public interface IReservaDAO extends CrudRepository<Reserva, Long>{
	
	@Query("FROM Reserva r WHERE r.estado = 'R' ORDER BY r.fecha_ingreso DESC")
	List<Reserva> findAllRecibidas();
	
	@Query("FROM Reserva r WHERE r.estado = 'A' ORDER BY r.fecha_ingreso DESC")
	List<Reserva> findAllAceptadas();
	
	@Query("FROM Reserva r WHERE r.estado = 'C' ORDER BY r.fecha_ingreso DESC")
	List<Reserva> findAllCanceladas();
	
	/*
	@Query("FROM Reserva r WHERE r.estado = 'R' AND r.fecha BETWEEN :fechaIngreso AND :fechaSalida ORDER BY r.fecha DESC")
	List<Reserva> findAllRecibidasWithRangoFechas(@Param("fechaIngreso") Date fechaIngreso, @Param("fechaSalida") Date fechaSalida);
	
	@Query("FROM Reserva r WHERE r.estado = 'A' AND r.fecha BETWEEN :fechaIngreso AND :fechaSalida ORDER BY r.fecha DESC")
	List<Reserva> findAllAceptadasWithRangoFechas(@Param("fechaIngreso") Date fechaIngreso, @Param("fechaSalida") Date fechaSalida);
	*/
}

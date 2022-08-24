package com.empresa.hoteljapp.app.service.interfaces;

import java.util.Date;
import java.util.List;

import com.empresa.hoteljapp.app.models.entities.Reserva;

public interface IReservaService {
	
	public List<Reserva> findAll(Date fecha);
	
	public List<Reserva> findAllAceptadas(Date fecha);
	
	public List<Reserva> findAllCanceladas(Date fecha);
	
	public Reserva saveOrUpdate(Reserva reserva);
	
	public Reserva changeState(Reserva reserva);
	
	public Reserva findById(Long id);

}

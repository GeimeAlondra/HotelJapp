package com.empresa.hoteljapp.app.service.interfaces;

import java.util.List;

import com.empresa.hoteljapp.app.models.entities.Servicio;


public interface IServicioService {
	public List<Servicio> findAll();
	public Servicio findById(Long id);
	public Servicio save(Servicio servicio);
	public void delete(Long id);
	public List<Servicio> fyndByNombre(String nombre);
}

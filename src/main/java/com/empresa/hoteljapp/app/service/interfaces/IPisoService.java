package com.empresa.hoteljapp.app.service.interfaces;

import java.util.List;

import com.empresa.hoteljapp.app.models.entities.Piso;

public interface IPisoService {
	
	public List<Piso> findAllActivos();
	
	public List<Piso> findAllInactivos();
		
	public Piso findById(Long id);
	
	public Piso save(Piso piso);
	
	public Piso changeEstado(Piso piso);
	
	public List<Piso> isExist(Piso piso);
}

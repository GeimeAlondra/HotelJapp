package com.empresa.hoteljapp.app.service.interfaces;

import java.util.List;

import com.empresa.hoteljapp.app.models.entities.Rol;

public interface IRolService {
	public List<Rol> findAll();
	public Rol findById(Long id);
	public Rol save(Rol rol);
	public void delete(Long id);
	public List<Rol> fyndByNombre(String nombre);
}

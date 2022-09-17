package com.empresa.hoteljapp.app.service.interfaces;

import java.util.List;

import com.empresa.hoteljapp.app.models.entities.Role;

public interface IRolService {
	public List<Role> findAll();
	public Role findById(Long id);
	public Role save(Role rol);
	public void delete(Long id);
	public List<Role> fyndByNombre(String nombre);
}

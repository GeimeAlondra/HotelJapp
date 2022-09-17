package com.empresa.hoteljapp.app.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.hoteljapp.app.models.dao.IRolDAO;
import com.empresa.hoteljapp.app.models.entities.Role;
import com.empresa.hoteljapp.app.service.interfaces.IRolService;

@Service
public class IRolServiceImpl implements IRolService{

	@Autowired
	private IRolDAO rolDAO;
	
	@Override
	public List<Role> findAll() {
		return (List<Role>)rolDAO.findAll();
	}

	@Override
	public Role findById(Long id) {
		return rolDAO.findById(id).orElse(null);
	}

	@Override
	public Role save(Role rol) {
		return rolDAO.save(rol);
	}

	@Override
	public void delete(Long id) {
		rolDAO.deleteById(id);
		
	}

	@Override
	public List<Role> fyndByNombre(String nombre) {
		return rolDAO.findByNombreIgnoreCase(nombre);
	}

}

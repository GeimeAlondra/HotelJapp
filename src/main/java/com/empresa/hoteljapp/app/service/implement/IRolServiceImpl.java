package com.empresa.hoteljapp.app.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.hoteljapp.app.models.dao.IRolDAO;
import com.empresa.hoteljapp.app.models.entities.Rol;
import com.empresa.hoteljapp.app.service.interfaces.IRolService;

@Service
public class IRolServiceImpl implements IRolService{

	@Autowired
	private IRolDAO rolDAO;
	
	@Override
	public List<Rol> findAll() {
		return (List<Rol>)rolDAO.findAll();
	}

	@Override
	public Rol findById(Long id) {
		return rolDAO.findById(id).orElse(null);
	}

	@Override
	public Rol save(Rol rol) {
		return rolDAO.save(rol);
	}

	@Override
	public void delete(Long id) {
		rolDAO.deleteById(id);
		
	}

	@Override
	public List<Rol> fyndByNombre(String nombre) {
		return rolDAO.findByNombreIgnoreCase(nombre);
	}

}

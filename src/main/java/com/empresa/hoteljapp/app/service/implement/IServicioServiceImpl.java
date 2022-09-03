package com.empresa.hoteljapp.app.service.implement;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.hoteljapp.app.models.dao.IServicioDAO;
import com.empresa.hoteljapp.app.models.entities.Servicio;
import com.empresa.hoteljapp.app.service.interfaces.IServicioService;

@Service
public class IServicioServiceImpl implements IServicioService{
	
	@Autowired
	private IServicioDAO servicioDAO;


	@Override
	public Servicio findById(Long id) {
		return servicioDAO.findById(id).orElse(null);
	}
	
	@Override
	public List<Servicio> findAll() {
		return (List<Servicio>)servicioDAO.findAll();
	}

	@Override
	@Transactional
	public Servicio save(Servicio servicio) {
		
		return servicioDAO.save(servicio);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		servicioDAO.deleteById(id);
	}

	@Override
	public List<Servicio> fyndByNombre(String nombre) {
		
		return servicioDAO.findByNombreIgnoreCase(nombre);
	}

}

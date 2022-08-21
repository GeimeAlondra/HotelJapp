package com.empresa.hoteljapp.app.service.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.hoteljapp.app.models.dao.IPisoDAO;
import com.empresa.hoteljapp.app.models.entities.Piso;
import com.empresa.hoteljapp.app.service.interfaces.IPisoService;


@Service
public class IPisoServiceImpl implements IPisoService{
	
	@Autowired
	private IPisoDAO pisoDAO;


	@Override
	public Piso findById(Long id) {
		return pisoDAO.findById(id).orElse(null);
	}

	@Override
	public Piso save(Piso piso) {
		return pisoDAO.save(piso);
	}

	@Override
	public List<Piso> findAllActivos() {
		return pisoDAO.findAll();

	}

	@Override
	public List<Piso> findAllInactivos() {
		return pisoDAO.findAllInactivos();

	}

	@Override
	public Piso changeEstado(Piso piso) {
		return pisoDAO.save(piso);
	}

	@Override
	public List<Piso> isExist(Piso piso) {
		return pisoDAO.findByNombreDescripcion(piso);
	}

}

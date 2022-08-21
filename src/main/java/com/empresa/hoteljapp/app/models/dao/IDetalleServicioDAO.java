package com.empresa.hoteljapp.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.empresa.hoteljapp.app.models.entities.DetalleServicio;
import com.empresa.hoteljapp.app.models.entities.Servicio;

public interface IDetalleServicioDAO extends CrudRepository<DetalleServicio, Servicio>{

}

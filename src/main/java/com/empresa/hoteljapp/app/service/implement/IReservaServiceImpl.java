package com.empresa.hoteljapp.app.service.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.hoteljapp.app.models.dao.IDetalleReservaDAO;
import com.empresa.hoteljapp.app.models.dao.IDetalleServicioDAO;
import com.empresa.hoteljapp.app.models.dao.IReservaDAO;
import com.empresa.hoteljapp.app.models.entities.DetalleReserva;
import com.empresa.hoteljapp.app.models.entities.DetalleServicio;
import com.empresa.hoteljapp.app.models.entities.Reserva;
import com.empresa.hoteljapp.app.service.interfaces.IReservaService;

@Service
public class IReservaServiceImpl implements IReservaService{
	
	@Autowired
	private IReservaDAO reservaDAO;
	
	@Autowired
	private IDetalleReservaDAO detalleReservaDAO;
	
	@Autowired
	private IDetalleServicioDAO detalleServicioDAO;

	@Override
	public List<Reserva> findAll(Date fecha_registro) {
		return reservaDAO.findAllRecibidas();
	}

	@Override
	public List<Reserva> findAllAceptadas(Date fecha_registro) {
		return null;
	}

	@Override
	public List<Reserva> findAllCanceladas(Date fecha_registro) {
		return null;
	}

	@Transactional
	@Override
	public Reserva saveOrUpdate(Reserva reserva) {
		
		Reserva reservaPersisted = null;
		
		try {
			if(reserva.getId() == null) {
				
				List<DetalleReserva> detalleReserva = reserva.getDetalleReserva();
				reserva.setDetalleReserva(new ArrayList<DetalleReserva>());
				
				List<DetalleServicio> detalleServicio = reserva.getDetalleServicio();
				reserva.setDetalleServicio(new ArrayList<DetalleServicio>());
			
				reservaPersisted = reservaDAO.save(reserva);
				
				//Recorriendo la coleccion de reserva
				for(DetalleReserva detalle: detalleReserva) {
					detalle.setReserva(reservaPersisted);
				}
				//Guardando el detalle de reserva
				detalleReservaDAO.saveAll(detalleReserva);
				
				//Recorriendo la coleccion de servicio
				for(DetalleServicio detalle: detalleServicio) {
					detalle.setReserva(reservaPersisted);
				}
				//Guardando el detalle de servicio
				detalleServicioDAO.saveAll(detalleServicio);
			
			}else {
				
				for(DetalleReserva detalle: reserva.getDetalleReserva()) {
					detalle.setReserva(reserva);
				}
				for(DetalleServicio detalle: reserva.getDetalleServicio()) {
					detalle.setReserva(reserva);
				}
				reservaDAO.save(reserva);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return reservaPersisted;
	}

	@Override
	public Reserva changeState(Reserva reserva) {
		return reservaDAO.save(reserva);
	}

	@Override
	public Reserva findById(Long id) {
		return reservaDAO.findById(id).orElse(null);
	}

}

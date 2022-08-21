package com.empresa.hoteljapp.app.models.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "detalle_servicios", schema = "public", catalog = "db_hoteljapp")

public class DetalleServicio implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "reserva_id", referencedColumnName = "id", nullable = false)
	private Reserva reserva;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "servicio_id", referencedColumnName = "id", nullable = false)
	private Servicio servicio;

	//Getters and setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public Reserva getReserva() {
		return reserva;
	}
	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}
	
	public Servicio getServicio() {
		return servicio;
	}
	public void setServicio(Servicio servicio) {
		this.servicio = servicio;
	}
}

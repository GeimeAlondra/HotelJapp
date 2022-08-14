package com.empresa.hoteljapp.app.models.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="reservas", schema = "public", catalog = "db_hoteljapp")
public class Reserva implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha_entrada", nullable = true)
	private Date fechaEntrada;
	
	@Column(name = "fecha_salida", nullable = true)
	private Date fechaSalida;
	
	@Column(name = "dia", nullable = false, precision = 2)
	private Double dia;
	
	@Column(name = "total", nullable = false, precision = 4)
	private Double total;
	
	@Column(name = "estado", nullable = false, length = 1)
	private String estado;
	
	// Relacion 1:N
	@OneToMany(mappedBy = "cliente", cascade = CascadeType.REFRESH, orphanRemoval = true)
	private List<Reserva> reservas = new ArrayList<>();
	
	@Column(name="create_at")
	@Temporal(TemporalType.DATE)
	private Date createAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "hanler"})
	@JoinColumn(name = "cliente_id", referencedColumnName = "id", nullable = false)
	private Cliente cliente;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "hanler"})
	@JoinColumn(name = "habitacion_id", referencedColumnName = "id", nullable = false)
	private Habitacion habitacion;
	
	@OneToMany(mappedBy = "reserva", fetch = FetchType.LAZY,  cascade = CascadeType.REFRESH, orphanRemoval = true)
	private List<DetalleReserva> detalleReserva;
	
	@PrePersist
	private void setEstado() {
	this.estado = "R";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFechaEntrada() {
		return fechaEntrada;
	}

	public void setFechaEntrada(Date fechaEntrada) {
		this.fechaEntrada = fechaEntrada;
	}

	public Date getFechaSalida() {
		return fechaSalida;
	}

	public void setFechaSalida(Date fechaSalida) {
		this.fechaSalida = fechaSalida;
	}

	public Double getDia() {
		return dia;
	}

	public void setDia(Double dia) {
		this.dia = dia;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public List<Reserva> getReservas() {
		return reservas;
	}

	public void setReservas(List<Reserva> reservas) {
		this.reservas = reservas;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Habitacion getHabitacion() {
		return habitacion;
	}

	public void setHabitacion(Habitacion habitacion) {
		this.habitacion = habitacion;
	}

	public List<DetalleReserva> getDetalleReserva() {
		return detalleReserva;
	}

	public void setDetalleReserva(List<DetalleReserva> detalleReserva) {
		this.detalleReserva = detalleReserva;
	}

}

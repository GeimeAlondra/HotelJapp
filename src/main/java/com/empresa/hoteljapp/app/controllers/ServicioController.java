package com.empresa.hoteljapp.app.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.hoteljapp.app.models.entities.Servicio;
import com.empresa.hoteljapp.app.service.interfaces.IServicioService;

@CrossOrigin(origins = "*.*")
@RestController
@RequestMapping("/api")
public class ServicioController {
	@Autowired
	private IServicioService servicioService;
	@GetMapping("/servicios")
	public List<Servicio> getAll(){
		return servicioService.findAll();
	}
	
	@GetMapping("/servicios/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Servicio servicio = null;
		Map<String, Object> response = new HashMap<>();
		try {
			servicio = servicioService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage());
		}
		if(servicio == null) {
			response.put("message", "El servicio con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Servicio>(servicio, HttpStatus.OK);
	}
	
	@PostMapping("/servicios")
	public ResponseEntity<?> save(@RequestBody Servicio servicio){
		Map<String, Object> response = new HashMap<>();
		try {
			if(servicioService.fyndByNombre(servicio.getNombre()).size() > 0) {
				response.put("message", "Ya existe un registro con este nombre en la base de datos");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CONFLICT);
			}else {
				
				servicioService.save(servicio);
			}
			
			
		}catch(DataAccessException e) {
			
			response.put("message", "Error al insertar registro en la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		response.put("message", "Servicio registrado con exito ");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		}
	@PutMapping("/servicios/{id}")
	public ResponseEntity<?> update(@RequestBody Servicio servicio, @PathVariable Long id){
		
		Servicio servicioActual = servicioService.findById(id);
		Servicio servicioUpdated = null;
		Map<String, Object> response = new HashMap<>();
		if(servicioActual == null) {
			response.put("message", "Error: no se puede editar, el servicio con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		try {
			servicioActual.setNombre(servicio.getNombre());
			servicioActual.setPrecio(servicio.getPrecio());
			servicioUpdated = servicioService.save(servicioActual);
		}catch(DataAccessException e) {
			response.put("message", "Error al actualizar el servicio");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Servicio actualizado con exito...");
		response.put("servicio", servicioUpdated);
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}

	@DeleteMapping("/servicios/{id}")
	public ResponseEntity<?>delete(@PathVariable Long id){
		Map<String, Object> response = new HashMap<>();
		try {
			servicioService.delete(id);
		}catch(DataAccessException e) {
			response.put("message","Error al eliminar servicio");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);	
		}response.put("message","El servicio ha sido eliminado...");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);	
	}
}

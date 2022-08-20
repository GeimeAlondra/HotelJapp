package com.empresa.hoteljapp.app.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.hoteljapp.app.models.entities.Piso;
import com.empresa.hoteljapp.app.service.interfaces.IPisoService;

@CrossOrigin(origins = "*.*")
@RestController
@RequestMapping("/api")
public class PisoController {
	
	@Autowired
	private IPisoService pisoService;
	
	@GetMapping("/pisos/activos")
	public List<Piso> getAllActivos(){
		return pisoService.findAllActivos();
	}
	@GetMapping("/pisos/inactivos")
	public List<Piso> getAllInactivos(){
		return pisoService.findAllInactivos();
	}
	
	@GetMapping("/pisos/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Piso piso = null;
		Map<String, Object> response = new HashMap<>();
		try {
			piso = pisoService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage());
		}
		if(piso == null) {
			response.put("message", "El piso con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Piso>(piso, HttpStatus.OK);
	}
	
	@PostMapping("/pisos")
	public ResponseEntity<?> save(@RequestBody Piso piso){
		Map<String, Object> response = new HashMap<>();
		try {
			if(pisoService.isExist(piso).size() > 0) {
				response.put("message", "Ya existe un registro con este nombre en la base de datos");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CONFLICT);
			}else {
				
				pisoService.save(piso);
			}
		}catch(DataAccessException e) {
			
			response.put("message", "Error al insertar registro en la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		response.put("message", "Piso registrado con exito ");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		}
	
	@PutMapping("/pisos/{id}")
	public ResponseEntity<?> update(@RequestBody Piso piso, @PathVariable Long id){
		
		Piso pisoActual = pisoService.findById(id);
		Piso pisoUpdated = null;
		Map<String, Object> response = new HashMap<>();
		if(pisoActual == null) {
			response.put("message", "Error: no se puede editar, el piso con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		try {
			pisoActual.setNombre(piso.getNombre());
			pisoUpdated = pisoService.save(pisoActual);
		}catch(DataAccessException e) {
			response.put("message", "Error al actualizar el piso");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Piso actualizado con exito...");
		response.put("piso", pisoUpdated);
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}

	@PutMapping("/pisos/change-state")
	public ResponseEntity<?> changeState(@RequestBody Piso piso, @RequestParam(name = "estado") String estado){

	Map<String, Object> response = new HashMap<>();
	try {
	piso.setEstado(estado);
	
	pisoService.save(piso);
	}catch(DataAccessException e) {
	response.put("message", "Error al cambiar el estado del piso");
	return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
		response.put("message", "El estado del piso ha sido cambiado a: "+estado.toString());
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
}
}

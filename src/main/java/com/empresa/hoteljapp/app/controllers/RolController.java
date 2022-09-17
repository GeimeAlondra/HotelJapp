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

import com.empresa.hoteljapp.app.models.entities.Role;
import com.empresa.hoteljapp.app.service.interfaces.IRolService;


@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api")
public class RolController {
	@Autowired
	private IRolService rolService;
	@GetMapping("/roles")
	public List<Role> getAll(){
		return rolService.findAll();
	}
	
	@GetMapping("/roles/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Role rol = null;
		Map<String, Object> response = new HashMap<>();
		try {
			rol = rolService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage());
		}
		if(rol == null) {
			response.put("message", "El rol con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Role>(rol, HttpStatus.OK);
	}
	
	@PostMapping("/roles")
	public ResponseEntity<?> save(@RequestBody Role rol){
		Map<String, Object> response = new HashMap<>();
		try {
			if(rolService.fyndByNombre(rol.getNombre()).size() > 0) {
				response.put("message", "Ya existe un registro con este nombre en la base de datos");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CONFLICT);
			}else {
				
				rolService.save(rol);
			}
			
			
		}catch(DataAccessException e) {
			
			response.put("message", "Error al insertar registro en la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		response.put("message", "Rol registrado con exito ");
		response.put("rol", rol);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		}
	@PutMapping("/roles/{id}")
	public ResponseEntity<?> update(@RequestBody Role rol, @PathVariable Long id){
		
		Role rolActual = rolService.findById(id);
		Role rolUpdated = null;
		Map<String, Object> response = new HashMap<>();
		if(rolActual == null) {
			response.put("message", "Error: no se puede editar, el rol con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		try {
			rolActual.setNombre(rol.getNombre());
			rolUpdated = rolService.save(rolActual);
		}catch(DataAccessException e) {
			response.put("message", "Error al actualizar el rol");
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Rol actualizado con exito...");
		response.put("rol", rolUpdated);
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}

	@DeleteMapping("/roles/{id}")
	public ResponseEntity<?>delete(@PathVariable Long id){
		Map<String, Object> response = new HashMap<>();
		try {
			rolService.delete(id);
		}catch(DataAccessException e) {
			response.put("message","Error al eliminar rol");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);	
		}response.put("message","El rol ha sido eliminado...");
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);	
	}
}

package com.empresa.hoteljapp.app.service.interfaces;

import com.empresa.hoteljapp.app.models.entities.Usuario;

public interface IUsuarioService {
	
	public Usuario findByuserName(String username);

}

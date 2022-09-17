package com.empresa.hoteljapp.app.service.implement;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.empresa.hoteljapp.app.models.dao.IUsuarioDAO;
import com.empresa.hoteljapp.app.models.entities.Usuario;
import com.empresa.hoteljapp.app.service.interfaces.IUsuarioService;

@Service
public class UsuarioService implements IUsuarioService, UserDetailsService{

private Logger logger = LoggerFactory.getLogger(UsuarioService.class);
	
	@Autowired 
	private IUsuarioDAO usuarioDAO;
	
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioDAO.findByuserName(username);
		
		if(usuario == null) {
			logger.error("Error en el login: no existe el usuario "+ username + " en el sistema");
			throw new UsernameNotFoundException("Error en el login: no existe el usuario");
		}
		//Obtenemos los roles de usuario
		List<GrantedAuthority> authorities = usuario.getRoles()
		.stream()
		.map(role -> new SimpleGrantedAuthority(role.getNombre()))
		.peek(authority -> logger.info("Role: " + authority.getAuthority()))
		.collect(Collectors.toList());
		
		return new User(usuario.getUserName(), usuario.getPassword(), usuario.getEnabled(), true, true, true, authorities);
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findByuserName(String username) {
		return usuarioDAO.findByuserName(username);
	}

}

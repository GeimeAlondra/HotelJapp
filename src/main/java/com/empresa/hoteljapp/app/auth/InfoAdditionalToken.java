package com.empresa.hoteljapp.app.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.empresa.hoteljapp.app.models.entities.Usuario;
import com.empresa.hoteljapp.app.service.interfaces.IUsuarioService;

@Component
public class InfoAdditionalToken implements TokenEnhancer{

	@Autowired
	private IUsuarioService usuarioService;

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		
		Usuario usuario = usuarioService.findByuserName(authentication.getName());
		Map<String, Object> info = new HashMap<>();
		
		//info.put("info_additional", "Hola ".concat(authentication.getName()));
		info.put("complete_name", usuario.getNombre());
		info.put("email", usuario.getEmail());
		info.put("user_name",(authentication.getName()));
		//info.put("user_id", usuario.getId());
		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		return accessToken;
	}

}

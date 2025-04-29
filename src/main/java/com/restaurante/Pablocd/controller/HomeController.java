package com.restaurante.Pablocd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";  
    }
    @GetMapping("/menu")
    public String mostrarMenu() {
        return "menu";
    }

    @GetMapping("/galeria")
    public String mostrarGaleria() {
        return "galeria";
    }

    @GetMapping("/carrito")
    public String mostrarCarrito() {
        return "carrito"; // Asegúrate de tener carrito.html en src/main/resources/templates
    }
}
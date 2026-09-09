// Probeta paramétrica de tolerancias FDM — CAD Lab 3D
// Recurso original, 9 de septiembre de 2026.
// Licencia: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
// Diseño didáctico. No se ha impreso, medido ni ensayado.
// Todas las dimensiones se expresan en milímetros.

placa_largo = 90;
placa_ancho = 24;
placa_alto = 5;

diametro_nominal = 10;
holguras_diametrales = [0, 0.1, 0.2, 0.3, 0.4];
primer_centro_x = 13;
paso_centros_x = 16;
centro_y = 12;

// Resolución de la geometría circular exportada como malla.
$fn = 180;

assert(placa_largo > 0 && placa_ancho > 0 && placa_alto > 0,
       "Las dimensiones de la placa deben ser positivas.");
assert(diametro_nominal > 0, "El diámetro nominal debe ser positivo.");
assert(len(holguras_diametrales) == 5,
       "Esta probeta utiliza exactamente cinco orificios.");
assert(paso_centros_x > 0, "El paso entre centros debe ser positivo.");

function diametro_orificio(i) = diametro_nominal + holguras_diametrales[i];
function centro_x(i) = primer_centro_x + paso_centros_x * i;

for (i = [0 : len(holguras_diametrales) - 1]) {
    radio = diametro_orificio(i) / 2;
    assert(holguras_diametrales[i] >= 0,
           "Las holguras diametrales de esta serie no pueden ser negativas.");
    assert(centro_x(i) - radio > 0 && centro_x(i) + radio < placa_largo,
           "Un orificio alcanza un extremo de la placa en X.");
    assert(centro_y - radio > 0 && centro_y + radio < placa_ancho,
           "Un orificio alcanza un borde de la placa en Y.");
    if (i > 0)
        assert(paso_centros_x > (diametro_orificio(i - 1) + diametro_orificio(i)) / 2,
               "Dos orificios se solapan o son tangentes.");
}

difference() {
    // Origen: esquina inferior izquierda de la base. Z va de 0 a placa_alto.
    cube([placa_largo, placa_ancho, placa_alto], center = false);

    for (i = [0 : len(holguras_diametrales) - 1]) {
        // El taladro sobresale por ambas caras para asegurar el corte pasante.
        translate([centro_x(i), centro_y, -1])
            cylinder(h = placa_alto + 2, d = diametro_orificio(i), center = false);
    }
}

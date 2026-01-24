<?php
class EstadisticasService {
    private mysqli $db;

    public function __construct(mysqli $db) {
        $this->db = $db;
    }

    public function resumenMensual($usuarioId, $mes, $anio): array {
        $sql = "SELECT
            SUM(CASE WHEN c.tipo='ingreso' THEN t.monto ELSE 0 END) ingresos,
            SUM(CASE WHEN c.tipo='gasto' THEN t.monto ELSE 0 END) gastos
        FROM transacciones t
        JOIN categorias c ON c.id = t.categoria_id
        WHERE t.usuario_id=? AND MONTH(t.fecha)=? AND YEAR(t.fecha)=?";

        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("iii", $usuarioId, $mes, $anio);
        $stmt->execute();
        $r = $stmt->get_result()->fetch_assoc();

        return [
            'ingresos' => (float)$r['ingresos'],
            'gastos'   => (float)$r['gastos'],
            'balance'  => (float)$r['ingresos'] - (float)$r['gastos']
        ];
    }
}

<?php
class TransaccionModel {
    private mysqli $db;

    public function __construct(mysqli $db) {
        $this->db = $db;
    }

    public function crear($usuarioId, $categoriaId, $descripcion, $monto, $fecha): bool {
        $sql = "INSERT INTO transacciones 
                (usuario_id, categoria_id, descripcion, monto, fecha)
                VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("iisds", $usuarioId, $categoriaId, $descripcion, $monto, $fecha);
        return $stmt->execute();
    }

    public function obtenerRecientes($usuarioId, int $limite = 5): array {
        $sql = "SELECT t.*, c.nombre, c.tipo, c.icono
                FROM transacciones t
                JOIN categorias c ON c.id = t.categoria_id
                WHERE t.usuario_id = ?
                ORDER BY t.fecha DESC
                LIMIT ?";

        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("ii", $usuarioId, $limite);
        $stmt->execute();

        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}

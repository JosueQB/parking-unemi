export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // Aquí puedes procesar los datos recibidos
        console.log('Datos recibidos:', data);

        // Enviar una respuesta de éxito al ESP32
        res.status(200).json({ message: 'Datos recibidos correctamente.' });
    } else {
        res.status(405).json({ error: 'Método no permitido.' });
    }
}
export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Flores en Hidalgo. Todos los derechos reservados.</p>
        <p className="font-headline">Un tributo a la flora medicinal de Hidalgo.</p>
      </div>
    </footer>
  );
}

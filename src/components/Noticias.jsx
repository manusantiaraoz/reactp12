import Noticia from "./Noticia";

const Noticias = ({ noticias }) => {
  return (
    <section className="d-flex flex-column">
      {noticias.map((noti, i) => (
        <Noticia
          key={i}
          image_url={noti.image_url}
          link={noti.link}
          title={noti.title}
          diario={noti.source_id}
        ></Noticia>
      )) }
    </section>
  );
};

export default Noticias;

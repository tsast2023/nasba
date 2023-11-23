

const SubscribeArea = ({df,h4}) => {
  
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <>
      <section className={`subscribe__area pb-100 ${df ? 'grey-bg box-m-15' : ''} ${h4 ? 'position-relative' : ''}`}>
        <div className={`container ${h4 ? 'custom-container' : ''}`}>
          <div className={`subscribe__inner ${df ? 'subscribe__inner-2 pt-120' : 'pt-95'}`}>
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
                <div className="subscribe__content text-center">
                  <h2>Infos sur réductions</h2>
                  <p>Abonnez-vous à la liste de diffusion e-nasba pour recevoir des mises à jour sur les nouveaux arrivages,
                     des offres spéciales et d'autres informations sur les réductions</p>
                  <div className="subscribe__form">
                    <form onSubmit={handleSubmit}>
                      <input type="email" placeholder="Subscribe to our newsletter..." />
                      <button className="os-btn os-btn-2 os-btn-3">subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscribeArea;
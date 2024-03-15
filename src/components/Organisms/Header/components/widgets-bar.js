export function WidgetBar({ description, logo }) {
  return (
    <div class="widgets-bar">
      <div class="container">
        <div class="row ml-0 mr-0">
          <div class="col-12 col-lg-6 align-self-center">
            <div class="d-flex justify-content-between">
              <a href="/">{logo}</a>
              <div class="d-flex d-lg-none flex-column align-items-center">
                <button type="button" class="open-mobile-menu">
                  <span
                    class="icon-hamburguer-menu-round icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Abrir menu de navegação</span>
                </button>
                <p class="mobile-menu-label">Menu</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 align-self-center ">
            <div class="site-description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type LoginPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function LoginPage(props: LoginPageProps): JSX.Element {
  const { authorizationStatus } = props;
  return (
    authorizationStatus === AuthorizationStatus.NoAuth ?
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={undefined}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required={undefined}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Root} className="locations__item-link" >
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      : <Navigate to={AppRoute.Root} />
  );

}

export default LoginPage;

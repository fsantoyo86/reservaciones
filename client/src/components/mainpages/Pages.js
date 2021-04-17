import {Switch, Route} from 'react-router-dom';
import Formulario from './products/Formulario';
import Login from './auth/Login';
import Register from './auth/Register';
import Ciudades from './products/Ciudades';
import Cart from './cart/Cart';
import Checkout from './products/Checkout';
import NotFound from './utils/not_found/NotFound';


function Pages() {
    return (
        <Switch>
          <Route path="/" exact component={Formulario} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/cart/:id" exact component={Cart} />
          <Route path="/ciudades" exact component={Ciudades} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="*" exact component={NotFound} />
        </Switch>
    );
}

export default Pages;

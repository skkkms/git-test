import Role from './role/role';
import Permission from './permission/permission';

export default {
  install() {
    Role.install();
    Permission.install();
  }
}

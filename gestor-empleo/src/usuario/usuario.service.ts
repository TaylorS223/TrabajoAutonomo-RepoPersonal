import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly UsuarioRepo: Repository<Usuario>
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario = await this.UsuarioRepo.save(createUsuarioDto);
    return nuevoUsuario;
  }

  findAll(): Promise<Usuario[]> {
    return this.UsuarioRepo.find()
      .then((usuarios) => {
        return usuarios;
      })
      .catch((error) => {
        throw new Error('Error al obtener los usuarios: ' + error.message);
      });
  }

  async findOne(id_usuario: string) {
    const usuario = await this.UsuarioRepo.findOneBy({ id_usuario });
    if (!usuario) {
      throw new NotFoundException('No se encontró el usuario');
    }
    return usuario;
  }

  update(id_usuario: string, updateUsuarioDto: UpdateUsuarioDto, callback: (err: any, result?: Usuario) => void) {
    this.UsuarioRepo.findOneBy({ id_usuario })
      .then((usuarioEncontrado) => {
        if (!usuarioEncontrado) {
          return callback(new NotFoundException('Usuario no encontrado'));
        }

        // Mezclar los cambios
        const usuarioActualizado = Object.assign(usuarioEncontrado, updateUsuarioDto);

        // Guardar cambios
        this.UsuarioRepo.save(usuarioActualizado)
          .then((usuarioGuardado) => callback(null, usuarioGuardado))
          .catch((error) => callback(error));
      })
      .catch((error) => callback(error));
  }

  async remove(id_usuario: string) {
    const usuario = await this.findOne(id_usuario);
    return await this.UsuarioRepo.remove(usuario);
  }
}

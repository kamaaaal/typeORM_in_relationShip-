import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
// import { Express } from 'express';
import { getQueryStringDto } from './user/dto/get-user-queryString.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  // constructor 
  constructor(private reflect : Reflector){}

  // method which enable acess to users
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
  
    // return authUser()
    const request : Request<any,any,any,getQueryStringDto> = context.switchToHttp().getRequest();
    const action : string= this.reflect.get<string>('action_type',context.getHandler());
    const tableName : string = this.reflect.get<string>('table_name',context.getClass());

    
    console.log("asction",action);
    console.log('from guard',request.body);
    console.log(context.getClass().name);
    console.log(context.getHandler().name);
    return authUser(request);
  }
}


/// helper function for canActive method
async function authUser(request : Request<any,any,any,getQueryStringDto>) {
  const query : getQueryStringDto = request.query ;
  if (query.userName === "kamal"){
    return true;
  }
  // else return false;
  else throw new UnauthorizedException({statusCode : 401,description : "no acess for this user"});
} 

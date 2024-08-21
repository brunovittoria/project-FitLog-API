import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

//Usamos o interface com o TS para obrigar que nos seja mandado os dados citados, aqui determinamos um "contrato"
interface AuthUserRequest{
    email: string,
    password: string,
}

class AuthUserService{
    async execute({ email, password }: AuthUserRequest){
        //Busca usuarios no nosso DB, Onde o email seja o equivalente ao do DB comparado ao enviado pelo user no FE e inclua a assinatura
        const user = await prismaClient.user.findFirst({  
            where: {
                email: email                             
            },
            include:{
                subscriptions: true,                     
            }
        }) 
        
        //Se nao existir um usuario. OBS: Colocamos email/senha incorretos por questoes de segurança, afinal nao queremos falar para um hacker q ele acertou o email mas a senha esta errada
        if(!user){                                       
            throw new Error("Email/Password Incorrect") 
        }

        // Verificar se a senha esta correta com a do usuario no DB que tem o mesmo email
        //No seu caso, user?.password, se user for nulo ou indefinido, a expressão inteira será avaliada como undefined em vez de causar um erro de "cannot read property 'password' of null". Isso é útil para lidar com objetos aninhados em situações em que nem sempre todas as propriedades são garantidas. 
        const passwordMatch = await compare(password, user?.password)  
        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        //Proximo passo sera gerar um token JWT
        //Cria um objeto contendo informações do usuário (payload do token)
        const token = sign(                             
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,                       
                expiresIn: '30d'
            }
        )
        //Fazemos um condicional no caso em que exista uma subscription ativa 
        //Caso nao encontre uma inscriçao ativa, retorna o STATUS NULL, isso ira servir para ALERTS de renovo de assinatura no FE 
        return { 
            id: user?.id,
            name: user?.name,
            email: user?.email,
            token: token,
            subscriptions: user?.subscriptions ? {         
                id: user?.subscriptions?.id,
                status: user?.subscriptions?.status
            } : null                                      
        }
    }
}

export { AuthUserService }
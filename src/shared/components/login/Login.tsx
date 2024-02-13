import { Box, Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material'
import { useAuthContext } from '../../contexts'
import * as yup from 'yup'
import { IVFormErros, VForm, VtexField, useVForm } from '../../forms'
import { useState } from 'react'

interface ILoginData {
    email: string
    password: string
}
const loginValidationSchema: yup.ObjectSchema<ILoginData> = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
})

interface ILoginProps {
    children: React.ReactNode
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext()
    const { formRef, save } = useVForm()

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (dados: ILoginData) => {
        setIsLoading(true)
        loginValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                login(dadosValidados.email, dadosValidados.password).then((result) => {
                    setIsLoading(false);
                });
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                const validationErrors: IVFormErros = {}
                errors.inner.forEach((error) => {
                    if (!error.path) return
                    validationErrors[error.path] = error.message
                })
                formRef.current?.setErrors(validationErrors)
            })
    }

    if (isAuthenticated) return <>{children}</>

    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <VForm
                ref={formRef}
                placeholder=""
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardContent>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            width={250}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                align="center"
                            >
                                Login
                            </Typography>
                            <VtexField
                                autoFocus
                                fullWidth
                                label="E-mail"
                                name="email"
                                disabled={isLoading}
                            />
                            <VtexField
                                fullWidth
                                label="Senha"
                                name="password"
                                disabled={isLoading}
                            />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                onClick={save}
                                disabled={isLoading}
                                endIcon={isLoading ? <CircularProgress size={20} variant='indeterminate' color='inherit' /> : undefined}
                            >
                                Entrar
                            </Button>
                        </Box>
                    </CardActions>
                </Card>
            </VForm>
        </Box>
    )
}

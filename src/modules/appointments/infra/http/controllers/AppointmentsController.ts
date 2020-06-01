import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointement = container.resolve(CreateAppointmentService);

    const appointment = await createAppointement.execute({
      date: parsedDate,
      provider_id,
    });
    return response.json(appointment);
  }
}

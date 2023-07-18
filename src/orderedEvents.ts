export interface OrderableEvent {
  orderingValue: number;
}
export type OrderedEvents<TEvent extends OrderableEvent> = {
  eventsInOrder: TEvent[];
};

interface TimeEvent extends OrderableEvent {}
export type TimelineEvents = OrderedEvents<TimeEvent>;

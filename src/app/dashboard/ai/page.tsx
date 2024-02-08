'use client';

import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/Button';

import { Separator } from '@radix-ui/react-dropdown-menu';
import { Textarea } from '@/components/ui/Textarea';

import { MaxLengthSelector } from './_PageSections/MaxlengthSelector';
import { ModelSelector } from './_PageSections/ModelSelector';

import { TemperatureSelector } from './_PageSections/TemperatureSelector';
import { TopPSelector } from './_PageSections/TopPSelector';
import { models, types } from './data/models';

import { Message, useChat } from 'ai/react';

export default function PlaygroundPage() {
  const { messages, input, handleInputChange, handleSubmit, stop, setMessages } = useChat();

  const emptyMessage: Message[] = [
    {
      id: 'empty34d345',
      createdAt: new Date('2024-02-08T00:57:54.306Z'),
      content: '',
      role: 'system'
    }
  ];

  const getCurrentRole = (role: string) => {
    if (role === 'system') return;
    return messages.length > 1 && role.toUpperCase();
  };

  return (
    <div className="mb-24">
      <h2 className="text-2xl mb-4 font-bold">Playground</h2>
      <Separator />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight mb-2">Input:</h1>
          <form onSubmit={handleSubmit} className="h-full">
            <Textarea
              placeholder="Submit some text to generate an AI Response"
              className="min-h-[18rem]"
              value={input}
              onChange={handleInputChange}
            />
            <div className="grid grid-cols-3 gap-4 items-center mt-4 min-h-[5rem]">
              <Button type="submit">Submit</Button>
              <Button onClick={() => setMessages(emptyMessage)} variant="secondary">
                Reset
              </Button>

              <Button onClick={() => stop()} variant="destructive">
                Stop
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-bold tracking-tight mb-2">Output:</h1>
          <div className="rounded-md border bg-muted overflow-y-scroll p-4 h-[24rem]">
            {messages.map((m) => (
              <div key={m.id} className="mt-2 whitespace-pre-wrap">
                <div className="font-bold">{getCurrentRole(m.role)}</div>
                {m.content}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8 mt-8">
          <ModelSelector types={types} models={models} />
          <TemperatureSelector defaultValue={[0.56]} />
          <MaxLengthSelector defaultValue={[256]} />
          <TopPSelector defaultValue={[0.9]} />
        </div>
      </div>
    </div>
  );
}

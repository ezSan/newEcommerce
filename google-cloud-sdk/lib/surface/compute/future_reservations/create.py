# -*- coding: utf-8 -*- #
# Copyright 2021 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Command for compute future reservations create."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.compute import base_classes
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.compute import flags as compute_flags
from googlecloudsdk.command_lib.compute.future_reservations import flags
from googlecloudsdk.command_lib.compute.future_reservations import resource_args
from googlecloudsdk.command_lib.compute.future_reservations import util


def _MakeCreateRequest(args, messages, project, future_reservation_ref):
  """Common routine for creating future reservation request."""
  future_reservation = util.MakeFutureReservationMessageFromArgs(
      messages, args, future_reservation_ref)
  future_reservation.description = args.description
  future_reservation.namePrefix = args.name_prefix

  return messages.ComputeFutureReservationsInsertRequest(
      futureReservation=future_reservation,
      project=project,
      zone=future_reservation_ref.zone)


def _RunCreate(compute_api, args):
  """Common routine for creating future reservation."""
  resources = compute_api.resources
  future_reservation_ref = resource_args.GetFutureReservationResourceArg(
  ).ResolveAsResource(
      args,
      resources,
      scope_lister=compute_flags.GetDefaultScopeLister(compute_api.client))

  messages = compute_api.client.messages
  project = future_reservation_ref.project
  create_request = _MakeCreateRequest(args, messages, project,
                                      future_reservation_ref)

  service = compute_api.client.apitools_client.futureReservations
  return compute_api.client.MakeRequests([(service, 'Insert', create_request)])


@base.ReleaseTracks(base.ReleaseTrack.ALPHA)
class CreateAlpha(base.CreateCommand):
  """Create a Compute Engine future reservation."""
  _support_share_setting = True
  _support_location_hint = True

  @classmethod
  def Args(cls, parser):
    resource_args.GetFutureReservationResourceArg().AddArgument(
        parser, operation_type='create')
    flags.AddCreateFlags(
        parser,
        support_share_setting=cls._support_share_setting,
        support_location_hint=cls._support_location_hint,
        support_fleet=True)

  def Run(self, args):
    return _RunCreate(
        base_classes.ComputeApiHolder(base.ReleaseTrack.ALPHA), args)


CreateAlpha.detailed_help = {
    'brief':
        'Create a Compute Engine future reservation.',
    'EXAMPLES':
        """
        To create a Compute Engine future reservation, run:

            $ {command} my-future-reservation --total-count=1000 --machine-type=n1-standard-1 --min-cpu-platform="Intel Haswell" --project=project-01 --zone=fake-zone
        """
}
